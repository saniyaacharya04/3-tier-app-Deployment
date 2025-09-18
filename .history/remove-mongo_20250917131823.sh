#!/bin/bash

echo "🚀 Starting MongoDB & Mongoose removal process..."

# 1️⃣ Uninstall packages
echo "Removing mongoose and mongodb packages..."
npm uninstall mongoose mongodb

# 2️⃣ Remove Mongo-related files
MONGO_PATHS=("models/mongo" "db/mongo.js")
for path in "${MONGO_PATHS[@]}"; do
  if [ -e "$path" ]; then
    echo "Deleting $path..."
    rm -rf "$path"
  else
    echo "Skipping $path — not found."
  fi
done

# 3️⃣ Remove Mongo import lines from code
CODE_DIR="./src"
if [ -d "$CODE_DIR" ]; then
  echo "Removing require/import statements for mongoose and mongodb..."
  
  # Remove require('mongoose') or import mongoose
  grep -rl "require('mongoose')" "$CODE_DIR" | xargs -I {} sed -i '' "/require('mongoose')/d" {}
  grep -rl "from 'mongoose'" "$CODE_DIR" | xargs -I {} sed -i '' "/from 'mongoose'/d" {}

  # Remove require('mongodb') or import mongodb
  grep -rl "require('mongodb')" "$CODE_DIR" | xargs -I {} sed -i '' "/require('mongodb')/d" {}
  grep -rl "from 'mongodb'" "$CODE_DIR" | xargs -I {} sed -i '' "/from 'mongodb'/d" {}
else
  echo "Code directory $CODE_DIR not found — skipping import removal."
fi

# 4️⃣ Remove MongoDB env variables
if [ -f ".env" ]; then
  echo "Cleaning MongoDB environment variables..."
  sed -i '' "/MONGO_URI/d" .env
else
  echo ".env file not found — skipping."
fi

echo "✅ MongoDB & Mongoose removal completed!"
