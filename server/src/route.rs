use crate::models::doc;
use axum::{routing::get, Router};

pub fn init_router(router: Router)->Router{
    router
        .route("/doc", get(doc::query_list))
}
