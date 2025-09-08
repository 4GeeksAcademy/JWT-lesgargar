"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# Crear cuenta ***
@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email:
        return jsonify({'msg': 'Email is missing'})
    if not password:
        return jsonify({'msg': 'Password is missing'})

    existing = User.query.filter_by(email=email).first()

    if existing:
        return jsonify({'error': 'User already exists'}), 400

    user = User()
    user.email = email
    user.password = generate_password_hash(password)
    user.is_active = True

    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity=str(user.id))

    return jsonify(access_token=token), 200

# Login


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({'Error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'Error': 'User does not exist'}), 401

    if not check_password_hash(user.password, password):
        return jsonify({'error': 'Something went wrong access denied'}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify(access_token=token), 200


@api.route('/my-home', methods=['GET'])
@jwt_required()
def handle_my_home():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    return jsonify({'id': user.id, 'email': user.email}), 200
