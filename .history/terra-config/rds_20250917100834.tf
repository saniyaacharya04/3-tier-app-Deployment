resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "three-tier-rds-subnet-group"
  subnet_ids = data.aws_subnets.public.ids
  tags = {
    Name = "Three-tier-RDS-Subnet-Group"
  }
}

resource "aws_db_instance" "mysql" {
  identifier         = "three-tier-mysql"
  engine             = "mysql"
  engine_version     = "8.0"
  instance_class     = "db.t3.micro"
  allocated_storage  = 20
  db_name            = "threeTierDB"       # <-- use db_name instead of name
  username           = "admin"
  password           = "Admin@123"         # Change to secure password
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true

  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  publicly_accessible    = true

  tags = {
    Name = "Three-tier-RDS-MySQL"
  }
}


resource "aws_security_group" "rds_sg" {
  name        = "rds_sg"
  description = "Allow MySQL access"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # or restrict to EKS VPC CIDR
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
