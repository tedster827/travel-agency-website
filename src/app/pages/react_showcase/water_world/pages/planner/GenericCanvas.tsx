'use client'
import React, { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { Button } from "@chakra-ui/react";

export default function GenericCanvas() {
  const { editor, onReady } = useFabricJSEditor();
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const canvasContainerRef = useRef(null); // Add a ref for the canvas container div
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasHistory = useRef<fabric.Object[]>([]);

  if(!fabric) {
    console.log("Package Error: fabric.js is installed improperly")
    return;
  }

  const [color, setColor] = useState("#35363a");
  const [cropImage, setCropImage] = useState(true);

  // Handle window resizing
  const containerRef = useRef<HTMLDivElement>(null); // Use this to reference the container div

    // Function to resize the canvas to match the container's size
    const resizeCanvasToContainer = () => {
      if (containerRef.current && editor?.canvas) {
          const width = containerRef.current.offsetWidth;
          const height = containerRef.current.offsetHeight;
          editor.canvas.setWidth(width);
          editor.canvas.setHeight(height);
          editor.canvas.calcOffset();
          editor.canvas.renderAll();
      }
  };

  useEffect(() => {
      // Resize the canvas once the editor is ready and when the window resizes
      window.addEventListener('resize', resizeCanvasToContainer);
      
      // Initial resize to ensure canvas matches container from the start
      if(editor?.canvas) {
          // Use a slight delay to ensure container dimensions are correctly calculated
          setTimeout(resizeCanvasToContainer, 100);
      }

      return () => window.removeEventListener('resize', resizeCanvasToContainer);
  }, [editor]); // Depend on 'editor' to re-apply if the editor is re-initialized


  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    // Set the initial size or update the canvas size
    editor.canvas.setWidth(canvasSize.width);
    editor.canvas.setHeight(canvasSize.height);
    addBackground();
    editor.canvas.renderAll();
  }, [editor?.canvas.backgroundImage, editor?.canvas, canvasSize]);

  const addBackground = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is installed improperly")
      return;
    }
    fabric.Image.fromURL(
      "https://thegraphicsfairy.com/wp-content/uploads/2019/02/Anatomical-Heart-Illustration-Black-GraphicsFairy.jpg",
      (image) => {
        console.log(typeof image)
        console.log(image)
        editor.canvas.setBackgroundImage(
          image,
          editor.canvas.renderAll.bind(editor.canvas)
        );
      }
    );
  };

  const addBackgroundFromFileUpload = () => {
    if(!fileInputRef.current) {
      return;
    }
    
    const file = fileInputRef.current?.files?.[0];

    if(!file) {
      alert("File Upload Was Unsuccessful")
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      if(!event.target || !editor) {
        return;
      }
      const imageURL = event.target.result
      // Note: Image URL must be a string
      if(!imageURL || imageURL instanceof ArrayBuffer){
        return;
      }
      fabric.Image.fromURL(imageURL, (image) => {
        if (!editor.canvas || editor.canvas.width === undefined || editor.canvas.height === undefined || image.width === undefined || image.height === undefined) {
          // Either canvas is not available, or width/height is undefined
          // Handle this scenario appropriately, maybe with an early return or error handling
          console.log("Canvas or its dimensions are not properly defined.");
          return;
        }
        editor.canvas.setBackgroundImage(
          image,
          editor.canvas.renderAll.bind(editor.canvas),
          {
            scaleX: editor.canvas.width / image.width,
            scaleY: editor.canvas.height / image.height,
          }
        );
      });
    };

    reader.readAsDataURL(file);
  };

  const toggleSize = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is installed improperly")
      return;
    }
    editor.canvas.freeDrawingBrush.width === 12
      ? (editor.canvas.freeDrawingBrush.width = 5)
      : (editor.canvas.freeDrawingBrush.width = 12);
  };

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.freeDrawingBrush.color = color;
    editor.setStrokeColor(color);
  }, [color]);

  const toggleDraw = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is installed improperly")
      return;
    }
    editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
  };
  
  const undo = () => {
    if (!editor) {
      console.log("Package Error: Fabric Editor is installed improperly");
      return;
    }
    if (editor.canvas._objects.length > 0) {
      // Removing the last item from the canvas and adding it to the history
      const removedItem = editor.canvas._objects.pop();
      if (removedItem) {
        canvasHistory.current.push(removedItem);
        editor.canvas.renderAll();
      }
    }
  };
  
  const redo = () => {
    if (canvasHistory.current.length > 0 && editor) {
      // Taking the last item from the history and adding it back to the canvas
      const item = canvasHistory.current.pop();
      if (item) {
        editor.canvas.add(item);
        editor.canvas.renderAll();
      }
    }
  };

  const clear = () => {
    if (!editor) {
      console.log("Package Error: Fabric Editor is installed improperly");
      return;
    }
    // Clear all objects from the canvas
    editor.canvas._objects.splice(0, editor.canvas._objects.length);
    
    // Correct way to clear the history when using useRef
    canvasHistory.current.splice(0, canvasHistory.current.length);
  
    // Render the canvas again to reflect the changes
    editor.canvas.renderAll();
  };

  const removeSelectedObject = () => {
    // Checking if editor or editor.canvas is falsy
    if (!editor || !editor.canvas) {
      console.log("Package Error: Fabric Editor is installed improperly");
      return;
    }
    // Getting the active object
    const activeObject = editor.canvas.getActiveObject();

    // Check if there's an active object to remove
    if (activeObject) {
      editor.canvas.remove(activeObject);
      editor.canvas.renderAll(); // Re-render the canvas to reflect the removal
    } else {
        console.log("No active object to remove.");
    }    
  };

  const onAddCircle = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is installed improperly")
      return;
    }
    editor.addCircle();
  };
  const onAddRectangle = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is installed improperly")
      return;
    }
    editor.addRectangle();
  };
  const addText = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is installed improperly")
      return;
    }
    editor.addText("inset text");
  };

  const exportSVG = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is installed improperly")
      return;
    }
    const svg = editor.canvas.toSVG();
    console.info(svg);
  };

  console.log(canvasHistory)

  return (
    <div className="p-4">
      <input type="file" ref={fileInputRef} onChange={addBackgroundFromFileUpload} />
      <Button onClick={onAddCircle}>➕ Add circle</Button>
      <Button onClick={onAddRectangle} disabled={!cropImage}>
        ➕ Add Rectangle
      </Button>
      <Button onClick={addText} disabled={!cropImage}>
        ➕ Add Text
      </Button>
      <Button onClick={toggleDraw} disabled={!cropImage}>
        ✏️ Toggle draw
      </Button>
      <Button onClick={toggleSize} disabled={!cropImage}>
        Toggle Pen Size
      </Button>
      <Button onClick={clear} disabled={!cropImage}>
        Clear
      </Button>
      <Button onClick={undo} disabled={!cropImage}>
        Undo
      </Button>
      <Button onClick={redo} disabled={!cropImage}>
        Redo
      </Button>
      <Button onClick={removeSelectedObject} disabled={!cropImage}>
        Delete
      </Button>
      <Button onClick={(e) => setCropImage(!cropImage)}>Crop</Button>
      <label hidden={!cropImage}>
        <input
          disabled={!cropImage}
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      <Button onClick={exportSVG} disabled={!cropImage}>
        {" "}
        ToSVG
      </Button>

      <div
        className="w-full h-full bg-gray-200 border-8 rounded-lg"
        ref={canvasContainerRef}
      >
        <FabricJSCanvas onReady={onReady} />
      </div>
    </div>
  );
}
