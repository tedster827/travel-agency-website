'use client'
import React, { useEffect, useState, useRef, useCallback } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { Button } from "@chakra-ui/react";

export default function GenericCanvas() {
  const { editor, onReady } = useFabricJSEditor();
  const canvasContainerRef = useRef(null); // Adds a ref for the parent container div
  const fileInputRef = useRef<HTMLInputElement>(null); // Adds a ref for the file upload.
  const canvasHistory = useRef<fabric.Object[]>([]);
  const previousCanvasHistory = useRef<fabric.Object[]>([]);

  const [drawingModeButtonText, setDrawingModeButtonText] = useState("✏️ Toggle Drawing Mode ON 🟢");
  const [penSizeButtonText, setPenSizeButtonText] = useState("✏️➕ Increase Pen Size");
  const [plannerModeMessage, setPlannerModeMessage] = useState(" Current Planner Modes: Drawing OFF 🔴 | Pen Size ▪️ (sm)");

  const [color, setColor] = useState("#35363a");
  const [cropImage, setCropImage] = useState(true);

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0});
  
  if(!fabric) {
    console.log("Package Error: fabric.js is installed improperly")
    return;
  }


  // Note: Due to (SSR) Serverside Rendering constraints, this code won't have access to the client/browser only window object. This function runs to ensure that the canvasSize is set only if the window object is available
  useEffect(() => {
    // This code runs only in the browser where 'window' is defined
    setCanvasSize({ width: window.innerWidth, height: window.innerHeight });

    // Optional: Handle window resize
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures this effect only runs once after initial render

  /* #region Canvas Resizing Logic */

  // Function to resize the canvas to match the container's size
  const resizeCanvasToContainer = useCallback(() => {
    const container = canvasContainerRef.current;
    if (container && editor?.canvas) {
      const width = container.clientWidth;
      const height = container.clientHeight;
      editor.canvas.setWidth(width);
      editor.canvas.setHeight(height);
      editor.canvas.calcOffset();
      editor.canvas.renderAll();
    }
  }, [editor]);

  useEffect(() => {
    // Resize the canvas when the editor is ready
    if (editor?.canvas) {
      resizeCanvasToContainer();
    }
  }, [editor, resizeCanvasToContainer]);

  useEffect(() => {
    // Add window resize listener to update canvas on resize
    window.addEventListener('resize', resizeCanvasToContainer);
    return () => {
      window.removeEventListener('resize', resizeCanvasToContainer);
    };
  }, [resizeCanvasToContainer]);

  /* #endregion */

  /* #region useEffect calls to handle initial window sizing and resizes. */

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    // Set the initial size or update the canvas size
    editor.canvas.setWidth(canvasSize.width);
    editor.canvas.setHeight(canvasSize.height);
    editor.canvas.calcOffset();
    editor.canvas.renderAll();
  }, [editor?.canvas, canvasSize]);

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

  /* #endregion */

  /* #region Background Image Handling */

  // FIXME: This and possibly other functions need to be updated to handle the default background render
  const addBackground = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is initialized improperly")
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
    if (!fileInputRef.current) {
      return;
    }
  
    const file = fileInputRef.current?.files?.[0];
  
    if (!file) {
      alert("😅 File Upload Was Unsuccessful. Please try again.");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = function (event) {
      if (!event.target || !editor) {
        return;
      }
      const imageURL = event.target.result;
      if (!imageURL || typeof imageURL !== 'string') {
        return;
      }
      fabric.Image.fromURL(imageURL, (image) => {
        if (!editor.canvas) {
          console.log("Canvas is not properly defined.");
          return;
        }
  
        // Calculate the scale to fit the image within the canvas
        const scale = Math.min(
          editor.canvas.width / image.width,
          editor.canvas.height / image.height
        );
  
        // Apply the scale to the image
        image.scale(scale);
  
        // Set the image as the background image
        editor.canvas.setBackgroundImage(image, editor.canvas.renderAll.bind(editor.canvas), {
          originX: 'center',
          originY: 'center',
          crossOrigin: 'anonymous',
        });
  
        // Center the background image
        image.set({
          top: editor.canvas.height / 2,
          left: editor.canvas.width / 2,
        });
  
        editor.canvas.renderAll();
      });
    };
  
    reader.readAsDataURL(file);
  };
  
  /* #endregion */

  /* #region Toggle/Mode Handlers */

  // TODO: Have Drawing mode off when user clicks on any of the non-drawing buttons

  useEffect(() => {
    if(!editor) {
      console.log("Editor Still Loading ...")
      return;
    }
    let message = "Current Planner Modes:";

    if (editor.canvas.isDrawingMode) {
      message += " Drawing ON 🟢 |";
    } else {
      message += " Drawing OFF 🔴 |";
    }
  
    if (editor.canvas.freeDrawingBrush.width <= 5) {
      message += " Pen Size ▪️ (sm) |";
    } else {
      message += " Pen Size ⬛️ (large) |";
    }
  
    setPlannerModeMessage(message);
  }, [editor?.canvas.isDrawingMode, editor?.canvas.freeDrawingBrush.width])

  const toggleSize = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is initialized improperly")
      return;
    }
    if(penSizeButtonText == "✏️➕ Increase Pen Size") {
      setPenSizeButtonText("✏️➖ Decrease Pen Size")
    }  else {
      setPenSizeButtonText("✏️➕ Increase Pen Size")
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


  // Note: Instead of having a state var for draw mode, we can track it with editor.canvas.isDrawingMode
  const toggleDraw = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is initialized improperly")
      return;
    }
    if(drawingModeButtonText == "✏️ Toggle Drawing Mode ON 🟢"){
      setDrawingModeButtonText("✏️ Toggle Drawing Mode OFF 🔴");
    } else {
      setDrawingModeButtonText("✏️ Toggle Drawing Mode ON 🟢")
    }
    editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
  };

  /* #endregion */
  
  /* #region Action Button Handlers */
  const undo = () => {
    if (!editor) {
      console.log("Package Error: Fabric Editor is initialized improperly");
      return;
    }
    if(editor.canvas._objects.length === 0 && previousCanvasHistory.current.length > 0) {
      previousCanvasHistory.current.forEach((historyItem) =>{
        editor.canvas._objects.push(historyItem)
      })
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
    if(!editor) {
      console.log("Package Error: Editor still loading ...")
      return;
    }


    if (canvasHistory.current.length > 0) {
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
      console.log("Package Error: Fabric Editor is initialized improperly");
      return;
    }

    // Saving a history if the undo button is clicked after clear.
    editor.canvas._objects.forEach(historyItem => {
      previousCanvasHistory.current.push(historyItem);
    });

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
      console.log("Package Error: Fabric Editor is initialized improperly");
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

  const exportSVG = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is initialized improperly")
      return;
    }
    const svg = editor.canvas.toSVG();
    alert(`Here's the image as an SVG!: \n\nNote: If the file is too large for this alert window please visit the dev console. \n\n${svg}`)
    console.info(svg);
  };

  /* #endregion */

  /* #region Add Shape Handlers */
  const onAddCircle = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is initialized improperly")
      return;
    }
    editor.addCircle();
  };

  const onAddLine = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is initialized improperly");
      return;
    }
    editor.addLine();
  }

  const onAddRectangle = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is initialized improperly")
      return;
    }
    editor.addRectangle();
  };

  const addText = () => {
    if(!editor) {
      console.log("Package Error: Fabric Editor is initialized improperly")
      return;
    }
    editor.addText("inset text");
  };

  /* #endregion */

  return (
    <div className="p-4">
      <h1 className="border-4 rounded mb-4 text-lg">{plannerModeMessage}</h1>
      <input type="file" ref={fileInputRef} onChange={addBackgroundFromFileUpload} />

      
      {/* Note: This conditional rendering is so that the user doesn't have the option to increase or decrease the pen size if the canvas isn't in drawing mode. */}
      <div className="flex justify-center mt-2 mb-2 gap-4">
        <Button onClick={toggleDraw}>
            {drawingModeButtonText}
        </Button>
        {editor?.canvas.isDrawingMode && 
          <Button onClick={toggleSize}>
            {penSizeButtonText}
          </Button>
        }
      </div>

      <div className="flex justify-center mt-2 mb-2 gap-4">
        <Button onClick={onAddCircle} disabled={true}>
          ➕ Add circle
        </Button>
        <Button onClick={onAddLine}>
          ➕ Add Line
        </Button>
        <Button onClick={onAddRectangle}>
          ➕ Add Rectangle
        </Button>
        <Button onClick={addText}>
          ➕ Add Text
        </Button>
      </div>

      <div className="flex justify-center mt-2 mb-2 gap-4">
        <Button onClick={clear}>
          🆑 Clear
        </Button>
        <Button onClick={undo}>
          ↩️ Undo
        </Button>
        <Button onClick={redo}>
          ↪️ Redo
        </Button>
        <Button onClick={removeSelectedObject}>
          ␡ Delete
        </Button>
        <Button onClick={exportSVG}>
          {" "}
          ToSVG
        </Button>
      </div>

      <div className="flex justify-center mt-2 mb-2 gap-4">
        <h1>Pen and Shape Color Selection!</h1>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div
        className="flex justify-center items-center w-full h-full bg-gray-200 border-8 rounded-lg"
        ref={canvasContainerRef}
      >
        <FabricJSCanvas onReady={onReady} />
      </div>
    </div>
  );
}
