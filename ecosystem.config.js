module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'API',
      script    : './dist/index.js',
      watch     : true,
      env: {
        NODE_ENV: 'development',
        DEBUG: '*'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : 'www.aipatn.com',
      ref  : 'origin/master',
      repo : 'https://github.com/gogokoala/aipatn-api.git',
      path : '/mnt/disk1/www/aipatn/api/prod',
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js --env production',
      env  : {
        NODE_ENV: 'production'
      }
    },
    dev : {
      user : 'root',
      host : 'www.aipatn.com',
      ref  : 'origin/master',
      repo : 'https://github.com/gogokoala/aipatn-api.git',
      path : '/mnt/disk1/www/aipatn/api/dev',
      'post-deploy' : 'npm install && tsc --outDir dist && pm2 startOrRestart ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'development',
        DEBUG: '*'
      }
    }
  }
};
