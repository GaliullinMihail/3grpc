

npm i zaucy-protoc-gen-grpc-web -g

protoc -I=./Protos jwt.proto \
    --js_out=import_style=commonjs:./generated \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./generated

protoc -I=./Protos message.proto \
    --js_out=import_style=commonjs:./generated \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./generated

Set-ExecutionPolicy Unrestricted -Scope CurrentUser

protoc -I./Protos --grpc_out=import_style=commonjs,mode=grpcwebtext:./src/generated jwt.proto
protoc -I./Protos --js_out=import_style=commonjs:./src/generated jwt.proto

protoc -I./Protos --grpc_out=import_style=commonjs,mode=grpcwebtext:./src/generated \
    --js_out=import_style=commonjs:./src/generated message.proto
