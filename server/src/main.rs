use crate::route::init_router;
use axum::{
    extract::Extension,
    http::{HeaderValue, Method},
    response::Html,
    routing::get,
    Router,
};
use sea_orm::{prelude::*, Database};
use std::env;
use std::net::SocketAddr;
use std::str::FromStr;
use std::time::Duration;
use tower::ServiceBuilder;
use tower_cookies::{CookieManagerLayer, Cookies};
use tower_http::cors::CorsLayer;
mod models;
mod route;

use tracing_subscriber::{fmt, layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    env::set_var("RUST_LOG", "error");

    tracing_subscriber::registry()
        .with(fmt::layer().pretty().with_writer(std::io::stderr))
        .init();

    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
    let host = env::var("HOST").expect("HOST is not set in .env file");
    let port = env::var("PORT").expect("PORT is not set in .env file");
    let server_url = format!("{}:{}", host, port);

    let conn = Database::connect(db_url).await.expect("连接数据库失败");

    let mut app = Router::new();
    app = init_router(app).layer(
        ServiceBuilder::new()
            .layer(CookieManagerLayer::new())
            .layer(Extension(conn))
            .layer(
                CorsLayer::new()
                    .allow_origin("*".parse::<HeaderValue>().unwrap())
                    .allow_methods([
                        Method::GET,
                        Method::OPTIONS,
                        Method::DELETE,
                        Method::PUT,
                        Method::POST,
                        Method::HEAD,
                        Method::PATCH,
                        Method::TRACE,
                        Method::CONNECT,
                    ]),
            ),
    );
    let addr = SocketAddr::from_str(&server_url).unwrap();
    serve(app, &addr).await;
    tracing::debug!("listening on {}", addr);
}

async fn serve(app: Router, addr: &SocketAddr) {
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
