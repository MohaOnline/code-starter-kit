import React from "react";

return (
    <React.Fragment>
        <code>
            cd ~/Applications/certbot
            source .venv/bin/activate
            .venv/bin/certbot --config-dir /usr/local/etc/letsencrypt --logs-dir /usr/local/var/log/letsencrypt \
            --work-dir /usr/local/lib/letsencrypt certonly --authenticator=dns-aliyun \
            --dns-aliyun-credentials='/usr/local/etc/letsencrypt/aliyun.ini' -d "*.das-ee.cn"
        </code>
    </React.Fragment>
)