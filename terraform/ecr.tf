

resource "aws_ecr_repository" "private_repository" {
  name                 = "proshop"
  force_delete = true
  image_scanning_configuration {
    scan_on_push = true
  }
}