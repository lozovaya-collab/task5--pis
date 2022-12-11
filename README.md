**5 задание**
Build Dockerfile:
```bash
docker build -t pis5 .
```

Run docker image:
```bash
docker run -p 3000:3000 pis5
```

**7 задание**
```bash
docker compose build 
docker compose up
```

**9 задание**
# start service
```bash
docker stack deploy -c docker-compose.yml task9-pis
```
# logs
```bash
docker service logs -f task9-pis_node
```

Project start on port 3000

Open [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.
