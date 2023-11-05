import jwt
import datetime

SECRET_KEY = 'your_secret_key'

expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=24)


def hash_password(password: str):
    payload = {
        'data': password,
        'exp': expiration_time
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def verify_password(password, token):
    try:
        decoded_payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        decrypted_data = decoded_payload['data']
        if password == decrypted_data:
            return True
        else:
            return False
    except jwt.ExpiredSignatureError:
        print("JWT has expired.")
        return False
    except jwt.DecodeError:
        print("JWT is invalid.")
        return False