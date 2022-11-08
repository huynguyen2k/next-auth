import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import httpProxy from 'http-proxy';
import url from 'url';

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve: any, reject: any) => {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get('access_token');

    if (accessToken) {
      req.headers.authorization = `Bearer ${accessToken}`;
    }

    req.headers.cookie = '';

    const pathname = url.parse(req.url ?? '').pathname;
    const isLogin = pathname === '/api/login' && req.method === 'POST';
    const isLogout = pathname === '/api/logout' && req.method === 'GET';

    if (isLogin) {
      proxy.once('proxyRes', interceptLoginResponse);
    }

    if (isLogout) {
      const cookies = new Cookies(req, res);
      cookies.set('access_token');

      res.status(200).json({ message: 'logout successfully' });
      return resolve();
    }

    proxy.web(req, res, {
      target: 'https://js-post-api.herokuapp.com',
      changeOrigin: true,
      selfHandleResponse: isLogin,
    });

    function interceptLoginResponse(proxyRes: any, req: any, res: any) {
      let responseBody = '';

      proxyRes.on('data', (chunk: any) => {
        responseBody += chunk;
      });

      proxyRes.on('end', () => {
        try {
          const { accessToken, expiredAt } = JSON.parse(responseBody);

          const cookies = new Cookies(req, res);
          cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(expiredAt),
          });

          res.status(200).json({ message: 'login successfully' });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    }
  });
}
