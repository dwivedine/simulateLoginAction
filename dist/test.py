import subprocess, sys

token  = subprocess.check_output('echo $ACTIONS_ID_TOKEN_REQUEST_TOKEN', shell=True)
#print("token is", token)

url = subprocess.check_output('echo $ACTIONS_ID_TOKEN_REQUEST_URL', shell=True)
print(url)
sys.exit(0)
