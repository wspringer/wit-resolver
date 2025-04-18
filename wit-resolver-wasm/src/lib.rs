mod bindings;

use std::cell::RefCell;

use bindings::exports::eastpole::wit_resolver::types::{Guest, GuestResolver};
use wit_parser::Resolve;

struct WitResolver {
    resolve: RefCell<Resolve>,
}

impl GuestResolver for WitResolver {
    fn new() -> Self {
        Self {
            resolve: RefCell::new(Resolve::new()),
        }
    }

    fn resolve(&self) -> Result<String, String> {
        Ok(serde_json::to_string(&self.resolve).unwrap())
    }

    fn register(&self, path: String, wit: String) -> Result<(), String> {
        let mut resolve = self.resolve.borrow_mut();
        match resolve.push_str(path, wit.as_str()) {
            Ok(_) => Ok(()),
            Err(e) => Err(format!("Failed to register: {}", e)),
        }
    }
}

struct Implementation;

impl Guest for Implementation {
    type Resolver = WitResolver;
}

bindings::export!(Implementation with_types_in bindings);
