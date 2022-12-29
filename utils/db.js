let mysql = require("mysql");

// 创建连接池
let pool = mysql.createPool({
  // 连接的服务器(代码托管到线上后,此处需改为内网ip,而非外网)
  host: "localhost",
  // mysql服务运行的端口
  port: 3306,
  //选择需要连接的数据库
  database: "xxx",
  //数据库用户名
  user: "xxx",
  //数据库密码
  password: "xxx",
});

// 对数据库进行增删改查操作的基础
function query(sql, callback) {
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (err, rows) {
      callback(err, rows);
      // 中断连接
      connection.release();
    });
  });
}

exports.query = query;
