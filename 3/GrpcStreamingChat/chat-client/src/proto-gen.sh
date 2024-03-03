

npm i zaucy-protoc-gen-grpc-web -g

protoc -I=./proto jwt.proto \
    --js_out=import_style=commonjs:./generated \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./generated

protoc -I=./proto message.proto \
    --js_out=import_style=commonjs:./generated \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./generated