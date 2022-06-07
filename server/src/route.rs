use crate::jwt;
use crate::models::doc;
use axum::{
    extract::Extension,
    http::{HeaderValue, Method, StatusCode},
    response::IntoResponse,
    routing::get_service,
    Router,
};
use sea_orm::DatabaseConnection;
use std::io;
use tower_http::{cors::CorsLayer, services::ServeDir};
pub fn init_router(conn: DatabaseConnection) -> Router {
    let mut router = Router::new();
    router = doc::route(router)
        .fallback(get_service(ServeDir::new("./static")).handle_error(handle_error))
        .layer(cors())
        .layer(Extension(conn));
    router = jwt::route(router);
    return router;
}
async fn handle_error(_err: io::Error) -> impl IntoResponse {
    (StatusCode::INTERNAL_SERVER_ERROR, "Something went wrong...")
}
fn cors() -> CorsLayer {
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
        ])
}
