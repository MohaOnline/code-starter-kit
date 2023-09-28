//
//  ExamplesAppUniversalApp.swift
//  ExamplesAppUniversal
//
//  Created by ma3310 on 2023/9/28.
//

import SwiftUI

@main
struct ExamplesAppUniversalApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
