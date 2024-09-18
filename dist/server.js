"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _router = require('./router');
var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);

const app = _express2.default.call(void 0, );

app.use(_cors2.default.call(void 0, ));
app.use(_express2.default.urlencoded({ limit: "460mb", extended: true }));
app.use(_express2.default.json({ limit: "460mb" }));

app.use(_router.router);

const port = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server is running on port ${port}`)
);

async function addNewHistory() {
  const response = await _axios2.default.get(`${process.env.URL_BACKEND}/new/history`, {
    params: { key: process.env.KEY },
  });

  if (response.status == 200) {
    return;
  } else {
    console.log("Erro ao atualizar historico");
  }
}

// addNewHistory();

setInterval(() => {
  console.log("chamou");

  addNewHistory();
}, 60000);
