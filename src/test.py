import subprocess, sys, os

token  = subprocess.check_output('echo $ACTIONS_ID_TOKEN_REQUEST_TOKEN', shell=True)
#print("token is", token)

url = subprocess.check_output('echo $ACTIONS_ID_TOKEN_REQUEST_URL', shell=True)
print(os.environ['ACTIONS_ID_TOKEN_REQUEST_URL'])
#os.environ['ACTIONS_ID_TOKEN_REQUEST_URL']
