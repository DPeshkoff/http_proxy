##############################
# Dockerfile to run hw       #
# Based on node              #
##############################

FROM node:16

WORKDIR /app

COPY ./ ./

RUN npm i

CMD ["npm", "start"]

EXPOSE 8080
EXPOSE 8000

LABEL \
    name="IAS_HW" \
    description="Internet Application Security HW" \
    version="1.0" \
    maintainer="dm...kov@gmail.com"
