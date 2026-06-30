pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        IMAGE_NAME = "sambhavdocks/chatbot-project"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Source') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-ssh',
                    url: 'git@github.com:Sambhavscoding/chatbot-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv('SonarQube') {
                        sh """
                        ${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=chatbot-project \
                        -Dsonar.sources=. \
                        -Dsonar.sourceEncoding=UTF-8
                        """
                    }
                }
            }
        }

        stage('Trivy File System Scan') {
            steps {
                sh 'trivy fs --severity HIGH,CRITICAL .'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME:$IMAGE_TAG .
                docker tag $IMAGE_NAME:$IMAGE_TAG $IMAGE_NAME:latest
                '''
            }
        }

        stage('Trivy Docker Image Scan') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL $IMAGE_NAME:$IMAGE_TAG'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    sh '''
                    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

                    docker push $IMAGE_NAME:$IMAGE_TAG
                    docker push $IMAGE_NAME:latest
                    '''
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh '''
                kubectl set image deployment/chatbot-deployment chatbot=$IMAGE_NAME:$IMAGE_TAG

                kubectl rollout status deployment/chatbot-deployment

                kubectl get pods

                kubectl get svc
                '''
            }
        }

    }

    post {

        success {
            echo '========================================='
            echo 'Build Successful!'
            echo 'Application deployed successfully to EKS'
            echo '========================================='
        }

        failure {
            echo '========================================='
            echo 'Build Failed!'
            echo 'Check the Jenkins Console Output.'
            echo '========================================='
        }

        always {
            cleanWs()
        }
    }
}
