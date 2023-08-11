pipeline {
    agent any
    stages {
        stage("Pre-Build"){
            steps {
                echo "Pre-Build"
                deleteDir()
                sh "docker --version"
                sh "docker compose version"
                echo "Pre-Build Complete"
            }
        }
        stage("Build"){
            steps {
                echo "Build"
                checkout scm
                sh "pwd"
                sh "cat ../.backend.env"
                sh "ls -a"
                sh "echo 'Build Successful' "
                // checkout scm
            }
        }
        stage("Push to Docker Hub"){
            steps {
                echo "Push to Docker Hub"
                // withCredentials([usernamePassword(credentialsId: "DockerHubCredentials", passwordVariable: "dockerHubPass", usernameVariable: "dockerHubUser")]){
                //     sh "docker tag node-hello ${env.dockerHubUser}/node-hello:latest"
                //     sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                //     sh "docker push  ${env.dockerHubUser}/node-hello-test:latest"
                // }
                echo "Pushed to Docker Successfully"
            }
        }
        stage("Deploy"){
            steps {
                echo "Deploy"
                // sh "docker run -d -p 3000:3000 node-hello"
                sh "docker compose down && docker compose up -d --build"
                echo "Deploy Successful"
            }
        }
        stage("Post Deploy"){
            steps {
                echo "Post Deploy"
                echo "Post Deploy Complete"
            }
        }

    }
}