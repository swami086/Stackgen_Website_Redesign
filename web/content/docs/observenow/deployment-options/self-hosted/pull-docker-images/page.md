---
title: "Step 1: Clone the image-override script"
product: "observenow"
sourcePath: "/observenow/deployment-options/self-hosted/pull-docker-images"
sourceUrl: "https://docs.stackgen.com/observenow/deployment-options/self-hosted/pull-docker-images"
status: "ok"
---

info

This is an optional step to pull container images needed by the StackGen stack into a private container registry.

This page lays out the steps to be followed in order to pull the container images needed by the StackGen stack into a private container registry like ECR.

## Step 1: Clone the image-override script

```shell
git clone https://github.com/OpsVerseIO/installers

cd installers/k8s-helm/image-override
```

## Step 2: Login container registries

info

Contact your StackGen customer success manager to get your credentials to the StackGen container registry

Login to the StackGen container registries by running the following commands:

```shell
docker login registry.devopsnow.io/public

docker login registry.devopsnow.io/private
```

Login to your container registry. The steps could vary based on the type of your registry. For AWS ECR,

```shell
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
```

## Step 3: Run the script

Setup the following environment variables:

```shell
export CONTAINER_TARGET_REGISTRY=<aws_account_id>.dkr.ecr.<region>.amazonaws.com

export CONTAINER_REGION=<region>

export REPOSITORY_PREFIX=<your-repository-prefix>_opsverse
```

```shell
sudo -E bash image-pull-push.sh
```
