use axum::Router;
use crate::models::doc;

pub fn init_router(router: Router)->Router{
    doc::route(router)
}
