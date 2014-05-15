/**
 * handlers.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor.
 * Copyright (c) 2010-2014 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php
 */
define([
	'blocks',
	'dragdrop',
	'functions',
	'keys',
	'mouse',
	'paste',
	'ranges',
	'selections',
	'typing'
], function Handlers(
	Blocks,
	DragDrop,
	Fn,
	Keys,
	Mouse,
	Paste,
	Ranges,
	Selections,
	Typing
) {
	'use strict';

	/**
	 * the handler stack
	 */
	var handlerStack = [
		Selections.handle,
		Typing.handle,
		Blocks.handle,
		DragDrop.handle,
		Paste.handle,
		function (alohaEvent) {
			console.log('editable');
			alohaEvent.editable = alohaEvent.editor.editables[1];
			return alohaEvent;
		},
		Mouse.handle,
		Keys.handle
	];

	/**
	 * contains the compiled version of the handle stack
	 */
	//var executeStack = function () { throw 'The handlerStack has never been compiled.'; };

	/**
	 * read and modify the current handler stack
	 * functions on the stack need to have an Aloha Event as their first parameter
	 * and return that event for the next function in the stack
	 *
	 * @param {Array.<Function>} stack will update the handler stack
	 * @return {Array.<Function>} the current handler stack
	 */
	function stack(st) {
		if (st) {
			handlerStack = st;
			//executeStack = compile(handlerStack);
		}
		return handlerStack;
	}

	/**
	 * prepares the stack for execution by compiling it
	 *
	 * @param {Array.<Function>} the new handler stack
	 * @return {Function} compiled handler stack, ready to be put in executeStack and executed
	 */
	function compile(st) {
		// we don't want "this" to be undefined when
		// invoking the handlers - passing the stack
		// itself seems to be the most relevant value			
		return Fn.comp.apply(st, st);

	}

	/**
	 * set the selection to the range of an aloha event
	 * 
	 * @param {!AlohaEvent} alohaEvent the aloha event that should be handled
	 */
	function setSelection(alohaEvent) {
		if (alohaEvent.range) {
			Ranges.select(alohaEvent.range);
		}
		return alohaEvent;
	}

	/**
	 * invoke all of the handlers on the handle stack
	 * afterwards the selection is set to event.range
	 * 
	 * @param {!AlohaEvent} alohaEvent the aloha event that should be handled
	 */
	function handle(handlers, alohaEvent) {
console.log(handlers);
		//executeStack(alohaEvent);
		//Fn.comp.apply(handlerStack, handlerStack)(alohaEvent);
		//setSelection(alohaEvent);
	}

	//stack(handlerStack);

	return {
		handle : handle,
		stack : handlerStack
	};
});
