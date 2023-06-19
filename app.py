from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO,emit

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(app,cors_allowed_origins="*")

fibo_cache = {0: 0, 1: 1}


def fibo(n):
    if n in fibo_cache:
        return fibo_cache[n]
    else:
        for i in range(max(fibo_cache.keys())+1, n+1):
            fibo_cache[i] = fibo_cache[i - 1] + fibo_cache[i - 2]
        return fibo_cache[n]


@app.route('/fibonacci/<int:value>', methods=['GET'])
def fibonacci(value):
    result = fibo_cache.get(value)
    if result is None:
        result = fibo_cache[value] = fibo(value)
    return jsonify({'result': result})


if __name__ == '__main__':
    app.run(host='0.0.0.0')
