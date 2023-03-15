

terraform {
  backend "s3" {
    bucket = "proshopbucket1000"
    region = "us-east-1"
    key    = "global/s3/terraform.tfstate"
  }
}