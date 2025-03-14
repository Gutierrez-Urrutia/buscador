node {
  def nodeHome = tool name: 'node-18', type:
'jenkins.plugins.nodejs.tools.NodeJSInstallation'
  env.PATH = "${nodeHome}/bin:${env.PATH}"

  stage('check tools') {
    bat "node -v"
    bat "npm -v"
  }
  stage('checkout') {
    checkout scm
  }
  stage('npm install') {
    bat "npm install"
  }
  stage('unit tests') {
    bat "npm test -- --watch=false"
  }
  stage('cypress tests') {
    bat "npm start &"
    bat "npm run cypress:run"
  }
}

