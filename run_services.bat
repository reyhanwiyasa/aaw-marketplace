@echo off
echo Starting auth service...
start cmd /k "cd auth && pnpm dev"

echo Starting orders service...
start cmd /k "cd orders && pnpm dev"

echo Starting products service...
start cmd /k "cd products && pnpm dev"

echo Starting tenant service...
start cmd /k "cd tenant && pnpm dev"

echo Starting wishlist service...
start cmd /k "cd wishlist && pnpm dev"
