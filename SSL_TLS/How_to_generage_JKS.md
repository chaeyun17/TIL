# How to genearte JKS

## 1. Generate self signed certificate
```
openssl req \
       -newkey rsa:2048 -nodes -keyout domain.key \
       -x509 -days 365 -out domain.crt
```

## 2. Convert to p12 format
```
openssl pkcs12 -export -name YOUR_KEYSTORE_ALIAS -in YOUR_CRT.crt -inkey YOUR_PRIVATE_KEY.key -out p12keystore.p12
```

## 3. Generate JKS
```
keytool -importkeystore -srckeystore p12keystore.p12 -srcstoretype pkcs12 -deststoretype pkcs12 -alias my_keystore -destkeystore my_keystore.jks
```

## 참고링크
- https://www.digitalocean.com/community/tutorials/java-keytool-essentials-working-with-java-keystores
- https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs/  
- https://openvidu.io/docs/deployment/deploying-ubuntu/

