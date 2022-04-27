// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      res.json({ method: 'POST', endpoint: 'Test' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
