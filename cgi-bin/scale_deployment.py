#!/usr/bin/python3

import cgi
from subprocess import getoutput as g

print("content-type:text/plain")
print()

form_values = cgi.FieldStorage()

dep_name = form_values.getvalue("dep")
rep = form_values.getvalue("replicas")

status = g("sudo kubectl scale deployment "+dep_name+" --replicas="+rep+" --kubeconfig=admin.conf" )
print(status)
