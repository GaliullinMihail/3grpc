

npm i zaucy-protoc-gen-grpc-web -g

protoc -I=./Protos jwt.proto \
    --js_out=import_style=commonjs:./generated \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./generated

protoc -I=./Protos message.proto \
    --js_out=import_style=commonjs:./generated \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./generated