# openssl

## self signed certificate
```
openssl req \
       -newkey rsa:2048 -nodes -keyout domain.key \
       -x509 -days 365 -out domain.crt
```

## generate java key store
### p12 format
```
openssl pkcs12 -export -name YOUR_KEYSTORE_ALIAS -in YOUR_CRT.crt -inkey YOUR_PRIVATE_KEY.key -out p12keystore.p12
```
## generate jks
```
keytool -importkeystore -srckeystore p12keystore.p12 -srcstoretype pkcs12 -deststoretype pkcs12 -alias my_keystore -destkeystore my_keystore.jks
```

