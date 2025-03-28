import express from 'express';

const deleteDemoRouter = express.Router();

deleteDemoRouter.delete('/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      demo: req.params.id,
    },
  });
});

export default deleteDemoRouter;
