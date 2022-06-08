use crate::route::init_router;
use axum::Router;
use sea_orm::{prelude::*, Database};
use std::env;
use std::net::SocketAddr;
use std::str::FromStr;
mod models;
mod route;
mod jwt;
mod ws;
use tracing_subscriber::{fmt, layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    env::set_var("RUST_LOG", "error");

    tracing_subscriber::registry()
        .with(fmt::layer().pretty().with_writer(std::io::stderr))
        .init();
    let app = init_router(make_db_conn().await);
    serve(app).await;
}

async fn serve(app: Router) {
    let host = env::var("HOST").expect("HOST is not set in .env file");
    let port = env::var("PORT").expect("PORT is not set in .env file");
    let server_url = format!("{}:{}", host, port);
    let addr = SocketAddr::from_str(&server_url).unwrap();

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
    tracing::debug!("listening on {}", addr);
}
async fn make_db_conn() -> DatabaseConnection {
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
    let conn = Database::connect(db_url).await.expect("连接数据库失败");
    return conn;
}
