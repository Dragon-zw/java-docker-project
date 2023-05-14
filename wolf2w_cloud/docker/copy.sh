#!/bin/sh

# copy sql
echo "begin copy sql "
cp ../profiles/sql/wolf2w-trip-travel.sql ./mysql/db
cp ../profiles/sql/wolf2w-trip-user.sql ./mysql/db
cp ../profiles/sql/trip-config.sql ./mysql/db

# copy html
echo "begin copy html "
cp -r ../trip-website-ui/** ./website/html/dist


# copy jar
echo "begin copy trip-gateway "
cp ../trip-api-gateway/target/trip-gateway.jar ./trip/gateway/jar

echo "begin copy trip-user "
cp ../trip-servers/trip-user-server/target/trip-user.jar ./trip/user/jar

echo "begin copy trip-article "
cp ../trip-servers/trip-travel-server/target/trip-article.jar  ./trip/article/jar
