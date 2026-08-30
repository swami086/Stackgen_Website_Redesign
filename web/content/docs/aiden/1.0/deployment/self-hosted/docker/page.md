---
title: "Step 1: Clone the Image-Override Script"
product: "aiden"
sourcePath: "/aiden/1.0/deployment/self-hosted/docker"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/deployment/self-hosted/docker"
status: "ok"
---

This is an optional step to pull container images needed by Aiden into a private container registry.

This page outlines the steps to pull the container images needed by Aiden into a private container registry like AWS ECR.

## Step 1: Clone the Image-Override Script

Clone the installer repository and navigate to the image-override directory:

```bash
git clone https://github.com/OpsVerseIO/installers

cd installers/k8s-helm/image-override
```

## Step 2: Login to Container Registries

info

Contact your StackGen Customer Success representative to get your credentials to the StackGen container registry.

Login to the StackGen container registries by running the following commands:

```bash
docker login registry.devopsnow.io/public

docker login registry.devopsnow.io/private
```

Login to your container registry. The steps may vary based on the type of your registry. For AWS ECR:

```bash
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
```

## Step 3: Run the Script

Set up the following environment variables:

```bash
export CONTAINER_TARGET_REGISTRY=<aws_account_id>.dkr.ecr.<region>.amazonaws.com

export CONTAINER_REGION=<region>

export REPOSITORY_PREFIX=<your-repository-prefix>_opsverse
```

Run the image pull and push script:

```bash
sudo -E bash image-pull-push.sh
```
