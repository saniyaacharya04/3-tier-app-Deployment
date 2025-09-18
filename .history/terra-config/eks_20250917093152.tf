# Create the EKS Cluster
resource "aws_eks_cluster" "eks_cluster" {
  name = "Three-tier-cloud"
  role_arn = aws_iam_role.cluster_role.arn

  vpc_config {
    subnet_ids = [
      for s in data.aws_subnets.public.ids : s
      if s != "subnet-0861feaf91aa9aac4"  # exclude us-east-1e
    ]
  }

  depends_on = [
    aws_iam_role_policy_attachment.cluster_AmazonEKSClusterPolicy,
  ]
}
