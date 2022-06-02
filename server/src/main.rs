use axum::{extract::Extension, response::Html, routing::get, Router};
use sqlx::PgPool;
use std::net::SocketAddr;

use crate::route::init_router;
mod models;
mod route;
#[tokio::main]
async fn main() {
    let db_pool = PgPool::connect("postgres://catnuko:mounts@localhost/postgis")
        .await
        .expect("数据库创建失败");

    let mut app = Router::new();
    app = init_router(app).layer(Extension(db_pool));
    let addr = SocketAddr::from(([127, 0, 0, 1], 9000));
    println!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}