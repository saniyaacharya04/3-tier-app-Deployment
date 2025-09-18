terraform {
  backend "s3" {
    bucket = "devops-terra-state-bucket-12345"
    key    = "eks/terraform.tfstate"
    region = "us-east-1"
  }
}
