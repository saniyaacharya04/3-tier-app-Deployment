################################
# 1️⃣ Security Group for RDS    #
################################
resource "aws_security_group" "rds_sg" {
  name        = "rds_sg"
  description = "Allow MySQL access from EKS nodes only"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    # Reference EKS node group's security group
    security_groups = [aws_eks_node_group.example.resources[0].auto_scaling_group_name] # corrected below
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

################################
# 2️⃣ Subnet Group for RDS     #
################################
resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "three-tier-rds-subnet-group"
  subnet_ids = data.aws_subnets.public.ids

  tags = {
    Name = "Three-tier-RDS-Subnet-Group"
  }
}

################################
# 3️⃣ MySQL RDS Instance       #
################################
resource "aws_db_instance" "mysql" {
  identifier           = "three-tier-mysql"
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"
  allocated_storage    = 20
  db_name              = "threeTierDB"
  username             = "admin"
  password             = "Admin@123"  # Change for production!
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true
  publicly_accessible  = false

  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name

  tags = {
    Name = "Three-tier-RDS-MySQL"
  }

  depends_on = [
    aws_security_group.rds_sg,
    aws_db_subnet_group.rds_subnet_group
  ]
}
