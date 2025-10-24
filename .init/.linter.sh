#!/bin/bash
cd /home/kavia/workspace/code-generation/user-management-system-43547-43601/admin_user_management_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

