const express = require("express");
const db = require("../db/db");
const { products } = require("../db/schema");
const { eq } = require("drizzle-orm");

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const entries = await db.select().from(products);

        return res.status(200).json(entries)
    }
    catch(err){
        return res.status(500).json({
            error: err.message || "valami gatya tortent",
        })
    }
});

router.get("/:id", async (req, res) => {
    try{
        const [entry] = await db.select().from(products).where(eq(products.id, +req.params.id))

        if(!entry){
            return res.status(404).json({
                message: "product not talált"
            });
        }

        return res.status(200).json(entry);
    }
    catch(err){
        return res.status(500).json({
            error: err.message || "valami gatya tortent",
        })
    }
});

router.post("/", async (req, res) => {
    try{
        const {name, price, inStock} = req.body;

        if(!name){
            return res.status(400).json({
                message: "hi, szaranev"
            })
        }
                if(!price){
            return res.status(400).json({
                message: "hi, j65uzg vbcmrth"
            })
        }
                if(!inStock){
            return res.status(400).json({
                message: "hi, KENE STOCK"
            })
        }
        await db.insert(products).values({
            name,
            price,
            inStock,
        });
        return res.status(201).json({
            message: "koszipuszi minden jo"
        })
    }
    catch(err){
        return res.status(500).json({
            error: err.message || "valami gatya tortent",
        })
    }
});

router.put("/:id", async (req, res) => {
    try{
        const {name, price, inStock} = req.body;

        const [entry] = await db.select().from(products).where(eq(products.id, +req.params.id));

        if(!entry){
            return res.status(404).json({
                message: "product not talált"
            });
        }

        await db.update(products).set({
            name,
            price,
            inStock
        }).where(eq(products.id, +req.params.id))

        return res.status(200).json({
            message: "jovan tesa, updaateltuk <3"
        })
    }
    catch(err){
        return res.status(500).json({
            error: err.message || "valami gatya tortent",
        })
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const [entry] = await db.select().from(products).where(eq(products.id, +req.params.id));

        if(!entry){
            return res.status(404).json({
                message: "product not talált"
            });
        }

        await db.delete(products).where(eq(products.id, +req.params.id));

        return res.status(200).json({
            message:"gatya az adatnak"
        });
    }
    catch(err){
        return res.status(500).json({
            error: err.message || "valami gatya tortent",
        })
    }

});

module.exports = router;