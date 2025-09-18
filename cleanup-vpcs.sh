#!/bin/bash

VPCS=("vpc-035a501527775cb96" "vpc-09d69fe05c8a09426")

for VPC_ID in "${VPCS[@]}"; do
    echo "Cleaning up VPC: $VPC_ID"

    # Delete subnets
    for subnet in $(aws ec2 describe-subnets --filters "Name=vpc-id,Values=$VPC_ID" --query "Subnets[].SubnetId" --output text); do
        echo "Deleting Subnet: $subnet"
        aws ec2 delete-subnet --subnet-id $subnet
    done

    # Delete security groups (skip default)
    for sg in $(aws ec2 describe-security-groups --filters "Name=vpc-id,Values=$VPC_ID" --query "SecurityGroups[?GroupName!='default'].GroupId" --output text); do
        echo "Deleting Security Group: $sg"
        aws ec2 delete-security-group --group-id $sg
    done

    # Delete VPC
    echo "Deleting VPC: $VPC_ID"
    aws ec2 delete-vpc --vpc-id $VPC_ID
done

