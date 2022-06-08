use crate::jwt;
use crate::models::doc;
use crate::ws;
use axum::{
    extract::Extension,
    http::{HeaderValue, Method, StatusCode},
    response::IntoResponse,
    routing::get_service,
    routing::{delete, get, post, put},
    Router,
};
use sea_orm::DatabaseConnection;
use std::io;
use tower_http::{cors::CorsLayer, services::ServeDir};
pub fn init_router(conn: DatabaseConnection) -> Router {
    let mut router = Router::new();
    router
        .route("/doc", get(doc::query_list).post(doc::create))
        .route(
            "/doc/:id",
            get(doc::find_by_id).delete(doc::deleteOp).put(doc::update),
        )
        .route("/ws", get(ws::ws_handler))
        .route("/authorize", post(jwt::authorize))
        .route("/protected", get(jwt::protected))
        .fallback(get_service(ServeDir::new("./static")).handle_error(handle_error))
        .layer(cors())
        .layer(Extension(conn))
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
