###############################
# 1️⃣ Security Group for RDS  #
###############################
resource "aws_security_group" "rds_sg" {
  name        = "rds_sg"
  description = "Allow MySQL access from EKS nodes only"
  vpc_id      = data.aws_vpc.default.id

  # Allow MySQL from EKS node group SGs
  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.eks_nodes.id] # reference explicit SG assigned to node group
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "RDS-SG"
  }
}

###############################
# 2️⃣ Node Group Security Group#
###############################
# If you don’t already have an explicit SG for node group, create one:
resource "aws_security_group" "eks_nodes" {
  name        = "eks_nodes_sg"
  description = "EKS worker nodes security group"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = [data.aws_vpc.default.cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "EKS-Nodes-SG"
  }
}

###############################
# 3️⃣ Subnet Group for RDS     #
###############################
resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "three-tier-rds-subnet-group"
  subnet_ids = data.aws_subnets.public.ids

  tags = {
    Name = "Three-tier-RDS-Subnet-Group"
  }
}

###############################
# 4️⃣ MySQL RDS Instance       #
###############################
resource "aws_db_instance" "mysql" {
  identifier           = "three-tier-mysql"
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"
  allocated_storage    = 20
  db_name              = "threeTierDB"
  username             = "admin"
  password             = "Admin@123"   # Replace with Secrets Manager or Terraform var for production
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true

  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  publicly_accessible    = false  # private DB

  tags = {
    Name = "Three-tier-RDS-MySQL"
  }

  depends_on = [
    aws_security_group.rds_sg,
    aws_security_group.eks_nodes,
    aws_db_subnet_group.rds_subnet_group
  ]
}
