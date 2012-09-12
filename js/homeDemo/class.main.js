/**
 * Copyright (c) 2012  Capgemini Technology Services (hereinafter “Capgemini”)
 *
 * License/Terms of Use
 *
 * Permission is hereby granted, free of charge and for the term of intellectual property rights on the Software, to any
 * person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify
 * and propagate free of charge, anywhere in the world, all or part of the Software subject to the following mandatory conditions:
 *
 *   •	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 *  Any failure to comply with the above shall automatically terminate the license and be construed as a breach of these
 *  Terms of Use causing significant harm to Capgemini.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 *
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @date 10/08/2012
 *
 * Purpose :
 * Template project
 * */
 var CGMain = CGSGScene.extend(
	{
		initialize : function (canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();
			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function () {
			var dim = new CGSGDimension(this.canvas.width, this.canvas.height);
			this.setCanvasDimension(dim);
		},

		/**
		 * Just create a single node (a square node)
		 *
		 */
		createScene : function () {
			//add a root node to the graph as a background
			this.rootNode = new CGSGNodeSquare(0, 0, this.canvas.width, this.canvas.height);
			this.rootNode.color = "white";
			this.rootNode.isClickable = false;
			this.sceneGraph.addNode(this.rootNode);
			
			this.squareNode = new CGSGNodeSquare(10, 10, 30, 30);
			this.squareNode.isResizable = true;
			this.squareNode.isDraggable = true;
			this.squareNode.color = "red";

			this.rootNode.addChild(this.squareNode);
			
			//create bees without image.
			//The image will be loaded just after and common to all bees
			this.createBees();
			
			
			//now, load the image containing the sprite sheet.
			//The affectation to the sprite will be done in the loaded handler function
			this.spriteBee = new Image();
			this.spriteBee.onload = this.onImageLoaded();
			this.spriteBee.src = "js/homeDemo/bee.png";
		},
		
		createBees : function() {
			this.bees = [];
			for (var b=0; b<30; b++) {
				var bee = new CGSGNodeAnimatedSprite(60, 60, null, this.context);
				bee.isDraggable = true;
				//name, speed, frames, sliceX, sliceY, width, height, framesPerLine
				bee.addAnimation("fly", 6, 3, 0, 0, 16, 16, 1);
				bee.play("fly", null);
				this.rootNode.addChild(bee);
				
				this.bees.push(bee);
			}
		},
		
		/**
		 * once the image is loaded, set it to the sprites
		 */
		onImageLoaded : function () {
			for (var b=0; b<this.bees.length; b++) {
				this.bees[b].setImage(this.spriteBee);
			}
		}

	}
);