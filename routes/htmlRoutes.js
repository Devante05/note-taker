app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/tables.html"));
  });